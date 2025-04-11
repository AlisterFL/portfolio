"use client"
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageGridProps {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

const ImageGrid2: React.FC<ImageGridProps> = ({ image1, image2, image3, image4 }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 max-w-5xl mx-auto ">
      {/* Image 1 (col 1-2, row 1) */}
      <motion.div 
        className="col-span-2 row-span-1 col-start-1 row-start-1"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Image
          src={image1}
          alt="Image 1"
          width={600}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-[2/1]"
        />
      </motion.div>

      {/* Image 2 (col 3-4, row 1) */}
      <motion.div 
        className="col-span-2 row-span-1 col-start-3 row-start-1"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={image2}
          alt="Image 2"
          width={600}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-[2/1]"
        />
      </motion.div>

      {/* Image 3 (col 1-2, row 2) */}
      <motion.div 
        className="col-span-2 row-span-1 col-start-1 row-start-2"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Image
          src={image3}
          alt="Image 3"
          width={600}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-[2/1]"
        />
      </motion.div>

      {/* Image 4 (col 3-4, row 2) */}
      <motion.div 
        className="col-span-2 row-span-1 col-start-3 row-start-2"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Image
          src={image4}
          alt="Image 4"
          width={600}
          height={300}
          className="w-full h-full object-cover rounded-3xl aspect-[2/1]"
        />
      </motion.div>
    </div>
  );
};

export default ImageGrid2;