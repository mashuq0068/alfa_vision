frappe.pages['live_grid'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Live CCTV Grid',
        single_column: true
    });

    const cameraContainer = $('<div class="camera-grid" id="camera-grid"></div>').appendTo(page.body);

    // Fetch camera data from the backend
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Camera",
            fields: ["camera_name", "stream_url", "status"]
        },
        callback: function(r) {
            if (r.message) {
                cameraContainer.empty(); 

                // Only show cameras with status "Online"
                const onlineCameras = r.message.filter(cam => cam.status === "Online");

                onlineCameras.forEach(cam => {
                    const camDiv = $(`
                        <div class="camera">
                            <h4>${cam.camera_name}</h4>
                            <iframe src="${cam.stream_url}" 
                                    allow="camera; microphone; autoplay" 
                                    style="width:100%; height:250px; border:none; object-fit:cover;">
                            </iframe>
                            <p>Status: ${cam.status}</p>
                        </div>
                    `);
                    cameraContainer.append(camDiv);
                });

                // Optional: Show message if no cameras are online
                if (onlineCameras.length === 0) {
                    cameraContainer.append('<p>No cameras are currently online.</p>');
                }
            }
        }
    });
};
