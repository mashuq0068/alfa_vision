// Copyright (c) 2025, 💡 Key points covered in the description: and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Camera", {
// 	refresh(frm) {

// 	},
// });

// Add list view indicator

// Copyright (c) 2025
// License information in license.txt

// Copyright (c) 2025
// License information in license.txt
// Add list view indicator
frappe.listview_settings["Camera"] = {
    add_fields: ["status"],
    get_indicator: function(doc) {
        console.log("Custom script loaded for", doc.name); // ✅ runs first

        // Simple test: green for all
        return [doc.status, "green", "status,=," + doc.status];
    }
};

