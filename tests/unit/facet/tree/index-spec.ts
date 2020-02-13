import { DataView } from '@antv/data-set';
import DIAMOND from '../../../../examples/data/diamond.json';
import { Chart } from '../../../../src';
import { createDiv } from '../../../util/dom';
/**
 * Create By Bruce Too
 * On 2020-02-12
 */
describe('facet tree', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 500,
    padding: [ 20, 80 ]
  });
  chart.data(DIAMOND);
  chart.scale( {
    cut: {
      sync: true
    },
    mean: {
      sync: true,
      tickCount: 5
    }
  });
  chart.legend('cut', {
    position: 'top'
  });
  chart.axis('cut', {
    label: null,
    tickLine: null
  });
  chart.facet('tree', {
    fields: [ 'clarity' ],
    line: {
      stroke: '#c0d0e0'
    },
    lineSmooth: true,
    // padding: 0,
    eachView: (view, facet) => {
      const data = facet.data;
      const dv = new DataView();
      dv.source(data)
        .transform({
          type: 'aggregate',
          fields: [ 'price' ],
          operations: [ 'mean' ],
          as: [ 'mean' ],
          groupBy: [ 'cut' ]
        });
      view.data(dv.rows);
      view.interval()
        .position('cut*mean')
        .color('cut');
    }
  });
  chart.render();
});
