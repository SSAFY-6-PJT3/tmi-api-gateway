require('dotenv').config({ path: './.env' });
import defaultRoutingTable from '../configs/routing-table.json';

type RoutingTable = {
  $isComplete: boolean;
  $target: string;
  $children: {
    [key: string]: RoutingTable;
  };
};

type RoutingTableWithEnv = {
  [key: string]: any;
};

type EndpointInfo = {
  endpoint: string | null;
  isComplete: boolean;
};

class RoutingTableManagerLib {
  private routingTable: RoutingTable;

  constructor() {
    this.routingTable = this.getRoutingTable();
  }

  public getRoutingTable(): any {
    const routingTableWithEnv: RoutingTableWithEnv = defaultRoutingTable;
    console.log(process.env.NODE_ENV as string);
    return routingTableWithEnv[process.env.NODE_ENV as string];
  }

  public getEndpointInfo(uri: string): EndpointInfo {
    const [uriPart] = uri.split('?');
    const uriChunk = uriPart.split('/').slice(1);

    let table: RoutingTable = this.routingTable.$children[uriChunk[0]];
    uriChunk.shift();

    while (table) {
      if (table.$isComplete) {
        return this.generateEndpointInfo(table.$target, uriChunk);
      }

      table = table.$children[uriChunk[0]];
      uriChunk.shift();
    }

    return {
      endpoint: null,
      isComplete: false,
    };
  }

  public generateEndpointInfo(
    $target: string,
    uriChunk: string[]
  ): EndpointInfo {
    let target = $target;

    if (uriChunk.length > 0) {
      target += `/${uriChunk.join('/')}`;
    }

    return {
      endpoint: target,
      isComplete: true,
    };
  }
}

export default new RoutingTableManagerLib();
export { RoutingTable };
