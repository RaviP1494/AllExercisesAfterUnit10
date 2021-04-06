$('#inputForm').on('submit', function (e) {
    e.preventDefault();
    const newDivStr = `${$('#movieName').val()} is rated ${$('#movieRating').val()}`;
    const deleteBtn = `<button>x</button>`
    $('#movieList').append(`<div>${deleteBtn} ${newDivStr}</div>`);
})

$('#movieList').on('click', 'button', function () {
    $(this).parent().remove();
})