// ตรวจสอบว่ากำลังอยู่ในหน้ารายละเอียดไดโนเสาร์
document.addEventListener("DOMContentLoaded", function () {
    const dinoDetailsContainer = document.getElementById("dino-details");
    const bookNowBtn = document.getElementById("book-now-btn");

    // ตรวจสอบว่ากำลังอยู่ในหน้ารายละเอียด
    if (dinoDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const dinoId = urlParams.get("id");

        // รายละเอียดของไดโนเสาร์
        const dinosaurs = {
            "t-rex": {
                name: "Tyrannosaurus Rex",
                description: "A large carnivorous dinosaur from the Cretaceous period.",
                image: "../assets/t-rex.jpg"
            },
            "triceratops": {
                name: "Triceratops",
                description: "A herbivorous dinosaur with three horns and a large frill.",
                image: "../assets/triceratops.jpg"
            }
        };

        // แสดงรายละเอียด
        if (dinosaurs[dinoId]) {
            dinoDetailsContainer.innerHTML = `
                <img src="${dinosaurs[dinoId].image}" alt="${dinosaurs[dinoId].name}" style="width:100%; border-radius: 10px;">
                <h2>${dinosaurs[dinoId].name}</h2>
                <p>${dinosaurs[dinoId].description}</p>
            `;

            // ปุ่มไปหน้าจอง
            bookNowBtn.href = `booking.html?dino=${dinoId}`;
        }
    }

    // หน้าจอง: กรอกไดโนเสาร์อัตโนมัติ
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        const dinoInput = document.createElement("input");
        dinoInput.type = "hidden";
        dinoInput.name = "dino";
        const urlParams = new URLSearchParams(window.location.search);
        dinoInput.value = urlParams.get("dino") || "";
        bookingForm.appendChild(dinoInput);

        // เมื่อกดยืนยัน ให้ไปยังหน้าการยืนยัน
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const date = document.getElementById("date").value;
            const dino = dinoInput.value;

            if (name && date && dino) {
                window.location.href = `confirmation.html?name=${name}&date=${date}&dino=${dino}`;
            } else {
                alert("Please fill in all details!");
            }
        });
    }

    // หน้ายืนยัน: แสดงข้อมูลที่จองไว้
    const confirmationPage = document.querySelector("h1");
    if (confirmationPage && confirmationPage.innerText === "Booking Confirmed") {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");
        const date = urlParams.get("date");
        const dino = urlParams.get("dino");

        const confirmationText = document.createElement("p");
        confirmationText.innerHTML = `Thank you, <strong>${name}</strong>, for booking <strong>${dino}</strong> on <strong>${date}</strong>!`;
        document.querySelector("main").appendChild(confirmationText);
    }
});

// ดึงค่าชื่อจาก Local Storage หรือค่าเริ่มต้น
document.addEventListener("DOMContentLoaded", function () {
    let customerName = localStorage.getItem("customerName") || "คุณ";
    document.getElementById("customerName").textContent = ` ${customerName}`;
});


// เมื่อโหลดหน้า confirmation.html ให้ดึงค่าจาก Local Storage
document.addEventListener("DOMContentLoaded", function () {
    let customerName = localStorage.getItem("customerName") || "คุณ";
    let dinoName = localStorage.getItem("dinoName") || "ไดโนเสาร์";
    let bookingDate = localStorage.getItem("bookingDate") || "ไม่ระบุ";

    document.getElementById("customerName").textContent = customerName;
    document.getElementById("dinoName").textContent = dinoName;
    document.getElementById("bookingDate").textContent = bookingDate;
});

function confirmBooking() {
    let nameInput = document.getElementById("name").value; // ชื่อ
    let dinoInput = document.getElementById("dino").value; // ไดโนเสาร์ที่เลือก
    let dateInput = document.getElementById("date").value; // วันที่จอง

    localStorage.setItem("customerName", nameInput);
    localStorage.setItem("dinoName", dinoInput);
    localStorage.setItem("bookingDate", dateInput);

    window.location.href = "confirmation.html"; // ไปหน้าการจองสำเร็จ
}

