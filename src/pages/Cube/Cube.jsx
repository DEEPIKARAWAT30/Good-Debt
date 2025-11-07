    import React, { useRef, useEffect } from "react";
    import FAST from "../../assets/dice/fast.png"
    import satisfaction from "../../assets/dice/satisfaction.png"
    import SAFE from "../../assets/dice/safe-secure.png"
    import personalized from "../../assets/dice/personalized.png"
    import trust from "../../assets/dice/trust.png"
    import support from "../../assets/dice/support.png"
    const faces = [
        {
            className: "front",
            img: FAST,
            h: "Fast Disbursal",
            p: "Our team helps customers make informed loan decisions.",
        },
        {
            className: "back",
            img: satisfaction,
            h: "Customer Satisfaction",
            p: "We prioritize client satisfaction above all else.",
        },
        {
            className: "right",
            img: SAFE ,
            h: "Safe & Secure",
            p: "Applying for loans and credit cards through Good Debt is full% safe and secure.",
        },
        {
            className: "left",
            img: personalized,
            h: "Personalised",
            p: "We curate the best available offers from banks, NBFCs & financial institutions.",
        },
        {
            className: "top",
            img: trust,
            h: "Trusted Service",
            p: "Building trust with our clients is our core value.",
        },
        {
            className: "bottom",
            img: support,
            h: "Excellent Support",
            p: "Providing quick, reliable, and customer-focused assistance to make your loan journey smooth and hassle-free.",
        },
    ];

    const cubeFaceTransforms = {
        front: "rotateY(0deg) translateZ(150px)",
        back: "rotateY(180deg) translateZ(150px)",
        right: "rotateY(90deg) translateZ(150px)",
        left: "rotateY(-90deg) translateZ(150px)",
        top: "rotateX(90deg) translateZ(150px)",
        bottom: "rotateX(-90deg) translateZ(150px)",
    };

    const Cube = () => {
        const diceRef = useRef(null);
        const state = useRef({
            autoRotate: true,
            rotationX: -30,
            rotationY: 0,
            dragging: false,
            lastX: 0,
            lastY: 0,
        });

        useEffect(() => {
            const dice = diceRef.current;
            let raf;

            function updateDice() {
                state.current.rotationX = Math.min(Math.max(state.current.rotationX, -90), 90);
                dice.style.transform = `rotateX(${state.current.rotationX}deg) rotateY(${state.current.rotationY}deg)`;
            }

            function animate() {
                if (state.current.autoRotate && !state.current.dragging) {
                    state.current.rotationY += 0.3;
                    updateDice();
                }
                raf = requestAnimationFrame(animate);
            }
            raf = requestAnimationFrame(animate);

            function getEvent(e) {
                return e.type.includes("touch") ? e.touches[0] : e;
            }

            function startDrag(e) {
                state.current.dragging = true;
                state.current.autoRotate = false;
                const evt = getEvent(e);
                state.current.lastX = evt.clientX;
                state.current.lastY = evt.clientY;
                dice.style.transition = "none";
            }

            function drag(e) {
                if (!state.current.dragging) return;
                e.preventDefault();
                const evt = getEvent(e);
                const deltaX = evt.clientX - state.current.lastX;
                const deltaY = evt.clientY - state.current.lastY;
                state.current.rotationY += deltaX * 0.5;
                state.current.rotationX -= deltaY * 0.5;
                state.current.lastX = evt.clientX;
                state.current.lastY = evt.clientY;
                updateDice();
            }

            function endDrag() {
                state.current.dragging = false;
                state.current.autoRotate = true;
                dice.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
            }

            dice.addEventListener("mousedown", startDrag);
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);

            dice.addEventListener("touchstart", startDrag);
            window.addEventListener("touchmove", drag, { passive: false });
            window.addEventListener("touchend", endDrag);

            return () => {
                cancelAnimationFrame(raf);
                dice.removeEventListener("mousedown", startDrag);
                window.removeEventListener("mousemove", drag);
                window.removeEventListener("mouseup", endDrag);

                dice.removeEventListener("touchstart", startDrag);
                window.removeEventListener("touchmove", drag, { passive: false });
                window.removeEventListener("touchend", endDrag);
            };
        }, []);

        return (
            <div className="flex flex-col  hidden lg:block   object-cover  items-center justify-center min-h-[100px]">

                <div
                    className="relative w-[300px] h-[200px]     mx-auto"
                    style={{ perspective: "1200px" }}
                >
                    <div
                        ref={diceRef}
                        className="w-[300px] h-[100px] relative"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "rotateX(-30deg) rotateY(0deg)",
                            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                            cursor: "grab",
                        }}
                    >
                        {faces.map((face) => (
                            <div
                                key={face.className}
                                className="absolute w-[300px] h-[300px] bg-[#9E1E27] rounded-[60px] shadow-inner border-3 border-white flex items-center justify-center"
                                style={{
                                    backfaceVisibility: "hidden",
                                    boxShadow: "inset 0 0 45px rgba(0,0,0,0.5)",
                                    transform: cubeFaceTransforms[face.className],
                                    overflow: "hidden",
                                }}
                            >
                                <div

                                    className=" bg-[#9E1E27]  shadow-none w-full h-full flex flex-col items-center justify-center"

                                >
                                    <div className="flex flex-col items-center justify-center bg-[#9E1E27] gap-2 text-center m-4">
                                        <img
                                            className="w-[75px] h-[75px] object-contain"
                                            src={face.img}
                                            alt={face.h}
                                        />
                                        <h1 className="text-lg font-bold text-white">{face.h}</h1>
                                        <p className="text-base font-normal text-white">{face.p}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    export default Cube;