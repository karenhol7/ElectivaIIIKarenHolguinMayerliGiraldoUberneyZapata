import { NavbarComponent } from "../../../components/navbar/NavbarComponent";
import { useState } from "react";
import './AddProduct.css';
import {addProduct} from '../../../services/addProduct'
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../../components/auth/AuthProvider'


export const CreateProduct = () => {

  const auth = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = auth.getToken()
      const user = auth.getUserInfo()
      const resp = await addProduct(token,{
        userId: user._id,
        name,
        description,
        category,
        url,
        image,
        tags,
      });

      if (resp.ok) {
        console.log('Producto creado');
        setErrorResponse("");
        navigate('/home');
      } else {
        console.log('Error en la creación del producto');
        const json = await resp.json();
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <NavbarComponent>
      <div className="add-product-container">
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h1>Add Product</h1>
          {errorResponse && <p className="error">{errorResponse}</p>}

          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <label>Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Tags</label>
          <div className="tags-input-container">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? (e.preventDefault(), handleAddTag()) : null}
              placeholder="Press Enter to add a label"
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  {tag} <span onClick={() => handleRemoveTag(tag)}>x</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">Save Product</button>
        </form>
      </div>
      </NavbarComponent>
  );
};
