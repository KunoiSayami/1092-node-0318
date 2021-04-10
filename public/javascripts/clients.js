'use strict';
let request_clients = function() {
	$.ajax({
		url:"/clients",
		method: "POST",
		data: {},
		datatype: "json",
		success: function(data){
			let table_val = '<tr><th>client id</th><th>client name</th></tr>';
			if (data.status == 200) {
				data.result.forEach(element => {
					table_val += `<tr><td>${element.uuid}</td><td>${element.hostname}</td></tr>`;
				});
			}
			localStorage.setItem('client_table', JSON.stringify({timestamp: Math.trunc(Date.now() / 1000), data: table_val}));

			$('#tb_client').html(table_val);
            $('#last_refresh').text(Date());
		}
	});
}

let render_table = function() {
	let data = JSON.parse(localStorage.getItem('client_table')) || {timestamp: 0};
	if (Math.trunc(Date.now() / 1000) - data.timestamp > 120) {
        request_clients();
    } else {
        $('#tb_client').html(data.data);
        $('#last_refresh').text(new Date(data.timestamp * 1000));
    }
}

$(document).ready(function() {
    render_table();
});