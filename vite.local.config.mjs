import {mergeConfig} from 'vite';
import dev from './vite.development.config.mjs';

export default mergeConfig(dev, {
    server: {
        port: 8085,
        host: '0.0.0.0',
        strictPort: true,
        historyApiFallback: true,
    },
});
