import { useParams, useLocation } from "react-router-dom";
import { NavbarComponent } from "../../components/navbar/NavbarComponent";
import { useAuth } from "../../components/auth/AuthProvider";
import { useFetchFollow } from '../../hooks/useFetchFollow';
import "./UserProfile.css";
import { useState } from "react";
import { followUser } from "../../services/followUser";
import { unFollowUser } from "../../services/unFollowUser";
import { FollowersModal } from "../../components/followersModal/FollowersModal";
import { useFetchUserProducts } from "../../hooks/useFetchUserProducts";
import { ProductGrid } from "../../components/productGrid/ProductGrid";

export const UserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const userInfo = auth.getUserInfo();
  const { followers, followings, refetchFollowers, isFollowing, unFollowedUser } = useFetchFollow(id, auth.getUserInfo()._id);
  const user = location.state?.user || {};

  const { products, isLoading } = useFetchUserProducts(id, auth.getToken());

  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const token = auth.getToken();
    await followUser(token, { id });
    refetchFollowers();
  };

  const handleUnfollowClick = async (e) => {
    e.preventDefault();
    const token = auth.getToken();
    await unFollowUser(token, { id });
    refetchFollowers();
    unFollowedUser();
  };

  const handleOpenFollowersModal = () => {
    setFollowersModalOpen(true);
  };

  const handleOpenFollowingsModal = () => {
    setFollowingsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFollowersModalOpen(false);
    setFollowingsModalOpen(false);
  };

  const formattedFollowings = followings.map(following => following.followedUserId);

  return (
    <NavbarComponent>
      <div className="profile-container">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={id === userInfo._id ? userInfo.avatar: user.avatar}
            alt="User Avatar"
          />
          <h1 className="profile-name">
            {id === userInfo._id ? userInfo.userName : user.userName}
          </h1>
        </div>
        <div className="profile-info">
          <div className="profile-stats">
            <div className="profile-stat" onClick={handleOpenFollowersModal}>
              <span className="stat-label">Followers</span>
              <span className="stat-value">{followers?.length}</span>
            </div>
            <div className="profile-stat" onClick={handleOpenFollowingsModal}>
              <span className="stat-label">Following</span>
              <span className="stat-value">{followings?.length}</span>
            </div>
          </div>
          {id !== userInfo._id && !isFollowing && (
            <button className="follow-button" onClick={handleClick}>Follow</button>
          )}
          {id !== userInfo._id && isFollowing && (
            <button className="followed-button" onClick={handleUnfollowClick}>Following</button>
          )}
        </div>
      </div>
      <FollowersModal
        isOpen={followersModalOpen}
        onRequestClose={handleCloseModal}
        title="Followers"
        users={followers}
      />
      <FollowersModal
        isOpen={followingsModalOpen}
        onRequestClose={handleCloseModal}
        title="Followings"
        users={formattedFollowings}
      />
      <div className="user-products">
        <h2 className="section-title">My Products</h2>
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </NavbarComponent>
  );
};
