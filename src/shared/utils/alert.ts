import Swal from "sweetalert2";

export function showSuccessToast(product: any): void {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    background: "#fff",
    customClass: {
      popup: "swal-add-cart",
    },
    html: `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${product.image || 'https://via.placeholder.com/45'}" 
             alt="${product.material || 'Producto'}" 
             style="width:45px; height:45px; border-radius:4px; object-fit:cover;" />
        <div style="font-size:14px; text-align:left;">
          <strong>${product.material || 'Producto'} - ${product.fitType || ''}</strong><br/>
          Talle: ${product.size}
        </div>
      </div>
    `,
  });
}