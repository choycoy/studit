import { motion } from "framer-motion";

export default function ThreeDotsLoader() {
  return (
    <div className="flex space-x-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="bg-main h-1 w-1 rounded-full"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
