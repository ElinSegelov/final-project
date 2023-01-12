/* eslint-disable no-undef */
import loaderOrange from 'assets/Loader/Loader_2.gif'
import Swal from 'sweetalert2'

export const swalBlurBackground = (text) => {
  Swal.fire({
    title: text,
    color: '#DE605B',
    imageUrl: `${loaderOrange}`,
    imageWidth: 300,
    imageHeight: 300,
    background: 'transparent',
    showConfirmButton: false,
    timer: 1500
  })
}