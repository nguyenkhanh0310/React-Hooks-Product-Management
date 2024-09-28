import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from '../../services/categoriesService';
import { editProduct } from '../../services/productsService';

function EditProduct(props) {
  const { item, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(item);
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategoryList();
      const categories = result.map(item => item.slug);
      setDataCategory(categories);
    }
    fetchApi();
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value
    });
  }

  // console.log(data);

  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editProduct(item.id, data);
    if (result) {
      setShowModal(false);
      onReload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật sản phẩm thành công",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <>
      <button onClick={openModal}>Chỉnh sửa</button>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Tiêu đề</td>
                <td>
                  <input value={data.title} type='text' name='title' onChange={handleChange} required />
                </td>
              </tr>

              {dataCategory.length > 0 && (
                <tr>
                  <td>Danh mục</td>
                  <td>
                    <select value={data.categories} name='category' onChange={handleChange} >
                      {dataCategory.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}

              <tr>
                <td>Giá</td>
                <td>
                  <input value={data.price} type='number' name='price' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Giảm giá</td>
                <td>
                  <input value={data.discountPercentage
                  } type='text' name='discount' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Số lượng còn lại</td>
                <td>
                  <input value={data.stock} type='text' name='stock' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Đường dẫn ảnh</td>
                <td>
                  <input value={data.thumbnail} type='text' name='thumbnail' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Mô tả</td>
                <td>
                  <textarea value={data.description} name='description' rows={4} onChange={handleChange}></textarea>
                </td>
              </tr>

              <tr>
                <td>
                  <button onClick={closeModal}>Hủy</button>
                </td>
                <td>
                  <input type='submit' value="Cập nhật" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default EditProduct;
