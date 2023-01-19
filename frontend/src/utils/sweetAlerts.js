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
  });
};

export const swalInformation = (title, text, icon, timer) => {
  Swal.fire({
    title,
    text,
    icon,
    color: '#dddddd',
    background: 'transparent',
    showConfirmButton: false,
    timer
  });
};