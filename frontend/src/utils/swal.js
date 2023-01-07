/* eslint-disable no-undef */
import loaderOrange from 'assets/Loader/Loader_2.gif'

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