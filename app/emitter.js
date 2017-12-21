import Emitter from 'events';

const emitter = new Emitter();

// Avoid fatal errors if no errors catcher
emitter.on('error', () => {});

export default emitter;
