import Swal from 'sweetalert2';
import loaderOrange from 'assets/Loader/Loader_2.gif';

export const swalBlurBackground = (text, time) => {
  Swal.fire({
    title: text,
    color: '#dddddd',
    imageUrl: `${loaderOrange}`,
    imageWidth: 300,
    imageHeight: 300,
    background: 'transparent',
    showConfirmButton: false,
    timer: time
  })
}

// TODO: ta timer som parameter och ändra det beroende av länged av texten