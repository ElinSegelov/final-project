/* eslint-disable no-undef */
import loaderOrange from 'assets/Loader/Loader_2.gif'
import Swal from 'sweetalert2'

export const swalWithTimer = (editEvent) => {
  Swal.fire({
    title: `${editEvent ? 'Your event has been updated!' : 'Your event has been created!'}`,
    timer: 1400,
    color: '#DE605B',
    timerProgressBar: true,
    imageUrl: `${loaderOrange}`,
    imageWidth: 100,
    imageHeight: 100,
    showConfirmButton: false
  })
}
export const swalBlurBackground = () => {
  Swal.fire({
    imageUrl: `${loaderOrange}`,
    imageWidth: 300,
    imageHeight: 300,
    background: 'transparent',
    showConfirmButton: false,
    timer: 1000
  })
}