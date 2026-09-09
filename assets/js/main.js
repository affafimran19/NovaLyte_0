/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".nav");


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================
   CONTACT FORM
========================= */

const form =
    document.querySelector("#contactForm");


if (form) {

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const formData =
                new FormData(form);


            const name =
                formData.get("name");

            const email =
                formData.get("email");

            const message =
                formData.get("message");


            const status =
                form.querySelector(
                    ".form-message"
                );


            if (
                !name ||
                !email ||
                !message
            ) {

                status.textContent =
                    "Please fill in your name, email and message.";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                status.textContent =
                    "Please enter a valid email address.";

                return;

            }


            status.textContent =
                "Thanks! Your message is ready. Connect this form to your backend or email service to receive submissions.";


            form.reset();

        }
    );

}


/* =========================
   PROJECT FILTER
========================= */

const filterButtons =
    document.querySelectorAll(
        ".filter"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    btn =>
                    btn.classList.remove(
                        "active"
                    )
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                const cards =
                    document.querySelectorAll(
                        ".portfolio-card"
                    );


                cards.forEach(
                    card => {

                        const category =
                            card.querySelector(
                                ".portfolio-meta span"
                            )?.textContent.trim();


                        if (
                            filter === "all"
                        ) {

                            card.style.display =
                                "";

                        }

                        else if (
                            filter === category
                        ) {

                            card.style.display =
                                "";

                        }

                        else if (
                            filter === "Technology" &&
                            category === "Technology"
                        ) {

                            card.style.display =
                                "";

                        }

                        else if (
                            filter === "Branding" &&
                            [
                                "Beauty",
                                "Legal",
                                "Consulting"
                            ].includes(category)
                        ) {

                            card.style.display =
                                "";

                        }

                        else if (
                            filter === "Web"
                        ) {

                            card.style.display =
                                "";

                        }

                        else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);