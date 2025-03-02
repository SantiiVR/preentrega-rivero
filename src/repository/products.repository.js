import  productsModel from "../models/products.models.js"

class ProductsRepository {
    
 addProduct = async (createProductDTO) => {
    return await productsModel.insertOne(createProductDTO)
};

 getProducts = async (query, limit, page, sort) => {
    return await productsModel.paginate(query, {
        limit,
        page,
        sort,
        lean: true,
      });
};

 getProductById = async (id) => {
    return await productsModel.findOne({_id:id}).lean()
};

 deleteProductById = async (id) => {
    return await productsModel.findByIdAndDelete({_id:id})
};

 updateProduct = async (id, updateProductDTO) => {
    return await productsModel.findByIdAndUpdate({_id:id}, updateProductDTO, {new:true})
};

}

export default ProductsRepository