import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from '../../services/categoriesService';
import { createProduct } from '../../services/productsService';

function CreateProduct(props) {
  const { onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
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

  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct(data);
    if (result) {
      setShowModal(false);
      onReload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tạo mới sản phẩm thành công",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <>
      <button onClick={openModal}>Tạo sản phẩm mới</button>

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
                  <input type='text' name='title' onChange={handleChange} required />
                </td>
              </tr>

              {dataCategory.length > 0 && (
                <tr>
                  <td>Danh mục</td>
                  <td>
                    <select name='category' onChange={handleChange} >
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
                  <input type='number' name='price' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Giảm giá</td>
                <td>
                  <input type='text' name='discount' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Số lượng còn lại</td>
                <td>
                  <input type='text' name='stock' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Đường dẫn ảnh</td>
                <td>
                  <input type='text' name='thumbnail' onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td>Mô tả</td>
                <td>
                  <textarea name='description' rows={4} onChange={handleChange}></textarea>
                </td>
              </tr>

              <tr>
                <td>
                  <button onClick={closeModal}>Hủy</button>
                </td>
                <td>
                  <input type='submit' value="Tạo mới" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default CreateProduct;
