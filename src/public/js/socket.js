const content= document.getElementById("content")

const botoncrear= document.getElementById("botoncrear")
const category=document.getElementById("category")
const description=document.getElementById("description")
const title=document.getElementById("title")
const price=document.getElementById("price")
const stock=document.getElementById("stock")
const thumbnail=document.getElementById("thumbnail")



botoncrear.addEventListener("click", async () => {
const productData={
    title:title.value,
    description:description.value,
    category:category.value,
    stock:stock.value,
    price:price.value,
    thumbnail:thumbnail.value
}
  console.log(productData)
   socket.emit("newProduct", productData)
   renderProducts()
 })


async function eliminarProducto(id) {
    const res=axios.delete(`http://localhost:8080/api/products/${id}`)
}



const socket = io();

socket.on("products", async (products) => {
  await renderProducts(products); 
});

async function renderProducts(products) {
  content.innerHTML = products.map((p) => {
    return `
      <div class="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col justify-evenly">
        <img src="${p.thumbnail}" alt="${p.title}" class="w-full h-40 object-cover mb-4 rounded-md">
        <h2 class="text-xl font-semibold text-gray-800">${p.title}</h2>
        <p class="text-gray-600 mb-4">${p.description}</p>
        <p class="text-lg font-bold text-gray-900">${p.price}</p>
        <p class="text-sm text-gray-500">Stock: ${p.stock}</p>
        <p class="text-sm text-gray-500">Código: ${p.code}</p>
        <p class="text-sm text-gray-500">Categoría: ${p.category}</p>
        <button id="borrarP" onclick="eliminarProducto(${p.id})" class="mt-4 inline-block text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 text-center">
          Borrar
        </button>
      </div>
    `;
  }).join('');
}
