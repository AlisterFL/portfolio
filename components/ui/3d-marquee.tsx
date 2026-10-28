"use client";

// Adapted from Aceternity UI — 3D Marquee (https://ui.aceternity.com/components/3d-marquee)
// Changes: seamless infinite columns, mouse parallax, clickable tiles with a hover label.
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type MarqueeImage = { src: string; alt: string; label?: string; href?: string };

export const ThreeDMarquee = ({
  images,
  columns = 4,
  className,
  gridClassName = "top-96 right-[50%]",
}: {
  images: MarqueeImage[];
  columns?: number;
  className?: string;
  /** Positions the tilted grid inside its 1720px box — tune it to the container's height */
  gridClassName?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const chunkSize = Math.ceil(images.length / columns);
  const chunks = Array.from({ length: columns }, (_, colIndex) =>
    images.slice(colIndex * chunkSize, colIndex * chunkSize + chunkSize)
  );

  // Subtle parallax: the whole wall drifts against the cursor
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const x = useSpring(useTransform(mouseX, [0, 1], [30, -30]), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(mouseY, [0, 1], [20, -20]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div style={{ x, y }} className="flex size-full items-center justify-center">
        <div className="w-[1720px] h-[1720px] shrink-0 scale-[0.55] sm:scale-75 lg:scale-90 xl:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
            }}
            className={cn("relative grid size-full origin-top-left grid-cols-4 gap-8", gridClassName)}
          >
            {chunks.map((column, colIndex) => (
              <div key={colIndex} className="relative">
                <GridLineVertical className="-left-4" offset="80px" />
                {/* The column is rendered twice and shifted by exactly half its height for a seamless loop */}
                <div
                  className={cn(
                    "marquee-col flex flex-col",
                    colIndex % 2 === 0 ? "marquee-col-up" : "marquee-col-down"
                  )}
                  style={{ "--marquee-duration": `${colIndex % 2 === 0 ? 48 : 60}s` } as React.CSSProperties}
                >
                  {[...column, ...column].map((image, imageIndex) => (
                    <Tile key={`${colIndex}-${imageIndex}`} image={image} hidden={imageIndex >= column.length} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Tile = ({ image, hidden }: { image: MarqueeImage; hidden: boolean }) => {
  const content = (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-[#0A0A0A]/5 shadow-sm bg-white transition-all duration-300 group-hover/tile:-translate-y-2.5 group-hover/tile:shadow-2xl group-hover/tile:shadow-[#533AFC]/20 group-hover/tile:ring-[#533AFC]/40">
      <Image
        src={image.src}
        alt={hidden ? "" : image.alt}
        fill
        sizes="420px"
        className="object-cover object-top opacity-80 transition-opacity duration-300 group-hover/tile:opacity-100"
        draggable={false}
      />
      {image.label && (
        <span className="absolute left-3 bottom-3 rounded-full bg-[#0A0A0A]/85 px-3.5 py-1.5 text-[15px] font-medium text-white opacity-0 translate-y-1 transition-all duration-300 group-hover/tile:opacity-100 group-hover/tile:translate-y-0">
          {image.label}
          {image.href && " →"}
        </span>
      )}
    </div>
  );

  const linkProps = {
    tabIndex: hidden ? -1 : undefined,
    "aria-hidden": hidden || undefined,
    className: "group/tile block",
  };

  return (
    // Padding instead of gap so two copies of a column are exactly twice one copy's height
    <div className="relative w-full pb-8">
      <GridLineHorizontal className="-top-4" offset="20px" />
      {!image.href ? (
        <div className="group/tile">{content}</div>
      ) : image.href.startsWith("/") ? (
        <Link href={image.href} {...linkProps}>
          {content}
        </Link>
      ) : (
        <a href={image.href} {...linkProps}>
          {content}
        </a>
      )}
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={
      {
        "--background": "#ffffff",
        "--color": "rgba(83, 58, 252, 0.25)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        maskComposite: "exclude",
      } as React.CSSProperties
    }
    className={cn(
      "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
      "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
      "[background-size:var(--width)_var(--height)]",
      "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
      "[mask-composite:exclude]",
      "z-30",
      className
    )}
  />
);

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={
      {
        "--background": "#ffffff",
        "--color": "rgba(83, 58, 252, 0.25)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        maskComposite: "exclude",
      } as React.CSSProperties
    }
    className={cn(
      "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
      "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
      "[background-size:var(--width)_var(--height)]",
      "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
      "[mask-composite:exclude]",
      "z-30",
      className
    )}
  />
);
