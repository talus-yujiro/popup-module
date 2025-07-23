export function showPopup({
    target,
    content = "",
    closeButton = false,
    darkenBackground = false,
    duration = 3000,
    position = "center"
}) {
    if (!target || !(target instanceof HTMLElement)) {
        console.error("有効な target 要素を指定してください。");
        return;
    }

    const bgColor = window.getComputedStyle(target).backgroundColor || "#ffffff";

    let overlay = null;
    if (darkenBackground) {
        overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = 9999;
        document.body.appendChild(overlay);
    }

    const popup = document.createElement("div");
    popup.setAttribute("tabindex", "-1");
    popup.innerHTML = `<div>${content}</div>`;
    popup.style.position = "fixed";
    popup.style.padding = "16px 24px";
    popup.style.backgroundColor = bgColor;
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    popup.style.zIndex = 10000;
    popup.style.opacity = 0;
    popup.style.transition = "opacity 0.5s";
    popup.style.outline = "none";

    if (closeButton) {
        const closeBtn = document.createElement("button");
        closeBtn.innerText = "×";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "6px";
        closeBtn.style.right = "10px";
        closeBtn.style.background = "none";
        closeBtn.style.border = "none";
        closeBtn.style.fontSize = "18px";
        closeBtn.style.cursor = "pointer";
        closeBtn.setAttribute("aria-label", "閉じる");
        closeBtn.onclick = closePopup;
        popup.appendChild(closeBtn);
    }

    const setPosition = () => {
        popup.style.transform = "translate(-50%, -50%)";
        switch (position) {
            case "top-left":
                popup.style.top = "20%";
                popup.style.left = "20%";
                break;
            case "top-right":
                popup.style.top = "20%";
                popup.style.left = "80%";
                break;
            case "bottom-left":
                popup.style.top = "80%";
                popup.style.left = "20%";
                break;
            case "bottom-right":
                popup.style.top = "80%";
                popup.style.left = "80%";
                break;
            case "top":
                popup.style.top = "10%";
                popup.style.left = "50%";
                break;
            case "bottom":
                popup.style.top = "90%";
                popup.style.left = "50%";
                break;
            case "left":
                popup.style.top = "50%";
                popup.style.left = "10%";
                break;
            case "right":
                popup.style.top = "50%";
                popup.style.left = "90%";
                break;
            case "center":
            default:
                popup.style.top = "50%";
                popup.style.left = "50%";
                break;
        }
    };

    setPosition();
    document.body.appendChild(popup);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
        popup.style.opacity = 1;
        popup.focus();
    });

    const escListener = (e) => {
        if (e.key === "Escape") {
            closePopup();
        }
    };
    document.addEventListener("keydown", escListener);

    const focusTrap = (e) => {
        if (!popup.contains(document.activeElement)) {
            e.preventDefault();
            popup.focus();
        }
    };
    document.addEventListener("focus", focusTrap, true);

    if (!closeButton) {
        setTimeout(() => {
            closePopup();
        }, duration);
    }

    function closePopup() {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.remove();
            if (overlay) overlay.remove();
            document.body.style.overflow = "";
            document.removeEventListener("keydown", escListener);
            document.removeEventListener("focus", focusTrap, true);
        }, 500);
    }
}
