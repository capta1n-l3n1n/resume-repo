import { NodeService } from '@/app/pages/service/node.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    templateUrl: './treedemo.component.html',
})
export class TreeDemoComponent implements OnInit {
    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    selectedFiles1: any;

    selectedFiles2: any;

    selectedFiles3: any;

    cols: any[] = [];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => (this.files1 = files));
        this.nodeService.getFilesystem().then((files) => (this.files2 = files));
        this.nodeService.getFiles().then((files) => {
            this.files3 = [
                {
                    label: 'Root',
                    children: files,
                },
            ];
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
        ];
    }
}
