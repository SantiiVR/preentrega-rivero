const content= document.getElementById("content")

const socket=io()
socket.emit("mensaje", "hola desde cliente")
socket.on("products", (products) => {
renderProducts(products)
})

function renderProducts(products) {
    content.innerHTML = products.map((p) => {
        return `
            <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
                <img src="${p.thumbnail}" alt="${p.title}" class="w-full h-40 object-cover mb-4 rounded-md">
                <h2 class="text-xl font-semibold text-gray-800">${p.title}</h2>
                <p class="text-gray-600 mb-4">${p.description}</p>
                <p class="text-lg font-bold text-gray-900">${p.price}</p>
                <p class="text-sm text-gray-500">Stock: ${p.stock}</p>
                <p class="text-sm text-gray-500">Código: ${p.code}</p>
                <p class="text-sm text-gray-500">Categoría: ${p.category}</p>
                <a href="#" class="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-center">
                    Ver más
                </a>
            </div>
        `;
    }).join('');
}


