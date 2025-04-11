"use client"
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageGridProps {
  smallImage: string;
  halfImage: string;
  largeImage: string;
  tallImage: string;
}

const ImageGrid1: React.FC<ImageGridProps> = ({ smallImage, halfImage, largeImage, tallImage }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 max-w-5xl mx-auto
      grid-auto-rows-[1fr] grid-auto-columns-[1fr]">
      {/* Petite image (col 1, row 2) */}
      <motion.div 
        className="col-span-1 row-span-1 col-start-1 row-start-1"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={smallImage}
          alt="Small"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-square"
        />
      </motion.div>

      {/* Image mi-hauteur (col 1, row 3 et 4) */}
      <motion.div 
        className="col-span-1 row-span-2 col-start-1 row-start-2"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        viewport={{ once: true }}
      >
        <Image
          src={halfImage}
          alt="Half"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-square"
        />
      </motion.div>

      {/* Image grande (col 2 et 3, row 2 et 3) */}
      <motion.div 
        className="col-span-2 row-span-2 col-start-2 row-start-1"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={largeImage}
          alt="Large"
          width={600}
          height={600}
          className="w-full h-full object-cover rounded-3xl aspect-square"
        />
      </motion.div>

      {/* Image haute (col 4, row 1 et 2) */}
      <motion.div 
        className="col-span-1 row-span-1 col-start-4 row-start-2"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        viewport={{ once: true }}
      >
        <Image
          src={tallImage}
          alt="Tall"
          width={300}
          height={600}
          className="w-full h-full object-cover rounded-3xl aspect-square"
        />
      </motion.div>
    </div>
  );
};

export default ImageGrid1;
