import RoutingTableManagerLib from './routing-table-manager.lib';
import defaultRoutingTable from '../configs/routing-table.json';

describe('routind table manager test', () => {
  describe('unit test', () => {
    describe('generateEndpointInfo test', () => {
      it('when there are target and uriChunk, attatch both', () => {
        const target = 'target/';
        const uriChunk = ['chunk1', 'chunk2'];
        const expected = target + '/chunk1/chunk2';

        expect(
          RoutingTableManagerLib.generateEndpointInfo(target, uriChunk).endpoint
        ).toBe(expected);
      });
    });

    describe('getEndpointInfo test', () => {
      const testRouingTable = {
        $isComplete: false,
        $target: '',
        $children: {
          apis: {
            $isComplete: false,
            $target: '',
            $children: {
              test: {
                $isComplete: true,
                $target: 'http://0.0.0.0:5010/test',
              },
            },
          },
        },
      };

      jest.mock(
        '../configs/routing-table.json',
        () => ({
          local: JSON.stringify(testRouingTable),
        }),
        { virtual: true }
      );

      it('when uri path is "apis/test", endpoint must be "0.0.0.0:5010/test"', () => {
        const uri = '/apis/test';
        const endpointInfo = RoutingTableManagerLib.getEndpointInfo(uri);

        expect(endpointInfo.endpoint).toBe('http://0.0.0.0:5010/test');
      });

      it('when uri is not existed in table, endpoint must be null', () => {
        const uri = 'wrong/uri';
        const endpointInfo = RoutingTableManagerLib.getEndpointInfo(uri);

        expect(endpointInfo.endpoint).toBeNull();
      });
    });
  });
});
