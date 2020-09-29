import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface ServiceCategory {
  title: string;
  id: string;
  subCategories?: ServiceCategory[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myproject';

  data: any = [];
  treeControl: NestedTreeControl<ServiceCategory> = undefined;
  dataSource = new MatTreeNestedDataSource<ServiceCategory>();
  constructor(private http: HttpClient) {}
  ngOnInit() {
    const url = 'http://208.109.13.111:9090/api/Category';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      console.log(this.data.result[0].title);
      console.log(this.data);
      this.treeControl = new NestedTreeControl<ServiceCategory>(
        (node) => node.subCategories
      );
      this.dataSource.data = this.data;
    });
  }
  hasChild = (_: number, node: ServiceCategory) =>
    !!node.subCategories && node.subCategories.length > 0;
}

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'Apple'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

// /**
//  * @title Tree with nested nodes
//  */
// @Component({
//   selector: 'tree-nested-overview-example',
//   templateUrl: 'tree-nested-overview-example.html',
//   styleUrls: ['tree-nested-overview-example.css'],
// })
// export class TreeNestedOverviewExample {
//   treeControl = new NestedTreeControl<FoodNode>(node => node.children);
//   dataSource = new MatTreeNestedDataSource<FoodNode>();

//   constructor() {
//     this.dataSource.data = TREE_DATA;
//   }

//   hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
// }
