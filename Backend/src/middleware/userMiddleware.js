// middleware/userMiddleware.js
function extractUserId(req, res, next) {
    // Verifica si userData está presente en la solicitud y si contiene un userId válido
    const userData = req.userData; 
    if (!userData || !userData.userId) {
        // Si no hay userData o userId, responde con un error de "usuario no autenticado"
        return res.status(401).json({ success: false, message: "Unauthenticated user" });
    }
    // Si userData y userId están presentes, asigna userId a req.userId
    req.userId = userData.userId;
    next(); // Llama al siguiente middleware en la cadena de middleware
}



module.exports = {
    extractUserId
};
