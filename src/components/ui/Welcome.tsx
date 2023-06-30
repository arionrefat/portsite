import { motion } from 'framer-motion';

export default function Welcome() {
	return (
		<h1 className='mb-10 font-monospace text-3xl text-black dark:text-white lg:text-5xl'>
			<div className='flex items-center gap-x-5'>
				Hello
				<motion.div
					animate={{ rotate: [0, 20, 0] }}
					transition={{
						type: 'tween',
						ease: 'easeOut',
						duration: 1,
						repeat: Infinity,
					}}
				>
					👋
				</motion.div>
			</div>
			I'm <span className='text-twilight-100'>Gazi Refat</span>
		</h1>
	);
}
