import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { deleteProduct } from '../../services/productsService';

function DeleteProduct(props) {
  const { item, onReload } = props;

  const deleteItem = async () => {
    const result = await deleteProduct(item.id);
    if (result) {
      onReload();
      Swal.fire({
        title: "Đã xóa!",
        text: "Đã xóa sản phẩm thành công.",
        icon: "success"
      });
    }
  }

  const handleDelete = () => {
    // console.log(item.id);
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Bạn sẽ không thể khôi phục thao tác này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, vẫn xóa!",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
      }
    });
  }

  return (
    <>
      <button onClick={handleDelete}>Xóa</button>
    </>
  );
}

export default DeleteProduct;
