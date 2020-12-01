import watermarkObserver, { watermarkObserverStandalone, createFixedWatermarkContainerDOM } from '../../src'

// @ts-ignore
watermarkObserverStandalone(createFixedWatermarkContainerDOM('water'), require('./image.png').default)
