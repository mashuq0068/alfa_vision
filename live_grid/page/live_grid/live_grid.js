frappe.pages['live_grid'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Live CCTV Grid',
        single_column: true
    });

    const cameraContainer = $('<div class="camera-grid" id="camera-grid"></div>').appendTo(page.body);

    // Fetch camera data from backend
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Camera",
            fields: ["camera_name", "camera_type", "stream_url", "status"]
        },
        callback: function(r) {
            if (r.message) {
                cameraContainer.empty(); 

                const onlineCameras = r.message.filter(cam => cam.status === "Online");

                onlineCameras.forEach(cam => {
                    let camElement;

                    // CCTV Camera (Local/Cloud)
                    if (cam.camera_type.startsWith("CCTV Camera")) {
                        camElement = $(`
                            <div class="camera">
                                <h4>${cam.camera_name} (${cam.camera_type})</h4>
                                <iframe src="${cam.stream_url}" 
                                        allow="camera; microphone; autoplay" 
                                        style="width:100%; height:250px; border:none; object-fit:cover;">
                                </iframe>
                                <p>Status: ${cam.status}</p>
                            </div>
                        `);
                    }
                    // Mobile Camera (Local/Cloud)
                    else if (cam.camera_type.startsWith("Mobile Camera")) {
                        camElement = $(`
                            <div class="camera">
                                <h4>${cam.camera_name} (${cam.camera_type})</h4>
                                <iframe src="${cam.stream_url}" 
                                        allow="camera; microphone; autoplay" 
                                        style="width:100%; height:250px; border:none; object-fit:cover;">
                                </iframe>
                                <p>Status: ${cam.status}</p>
                            </div>
                        `);
                    }
                    // USB Webcam
                    else if (cam.camera_type === "USB Webcam") {
                        camElement = $(`
                            <div class="camera">
                                <h4>${cam.camera_name} (${cam.camera_type})</h4>
                                <img src="${cam.stream_url}" alt="Live Stream">
                                <p>Status: ${cam.status}</p>
                            </div>
                        `);
                        // Access the first available local webcam
                        const video = camElement.find("video")[0];
                        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                            .then(stream => { video.srcObject = stream; })
                            .catch(err => { console.error("USB Webcam access failed", err); });
                    }
                    // Unknown type fallback
                    else {
                        camElement = $(`<p>Unknown camera type for ${cam.camera_name}</p>`);
                    }

                    cameraContainer.append(camElement);
                });

                if (onlineCameras.length === 0) {
                    cameraContainer.append('<p>No cameras are currently online.</p>');
                }
            }
        }
    });
};
