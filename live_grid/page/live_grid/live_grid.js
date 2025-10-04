frappe.pages['live_grid'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Live CCTV Grid',
		single_column: true
	});
	$(frappe.render_template("live_grid", { }, {})).appendTo(page.body);
}
