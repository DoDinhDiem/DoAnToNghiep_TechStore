$(document).ready(function () {
    // Bắt sự kiện click vào li
    $('.side-nav-item a').click(function () {
        // Ẩn tất cả các collapse
        $('.collapse').collapse('hide')

        // Hiển thị collapse của li được click
        $($(this).attr('href')).collapse('show')
    })
})
