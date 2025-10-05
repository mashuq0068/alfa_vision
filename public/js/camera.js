
// for status indicator in list view
frappe.listview_settings["Camera"] = {
    add_fields: [ "status"],
    get_indicator: function(doc) {
        var status = doc.status ? doc.status.trim().toLowerCase() : "";
        var color_map = { online: "green", offline: "red" };
        var color = color_map[status] || "gray";
        var display_status = status.charAt(0).toUpperCase() + status.slice(1);
        return [display_status, color, "status,=," + display_status];
    }
};


