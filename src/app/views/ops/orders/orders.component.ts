import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Order } from 'src/app/shared/models/sendForm';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { OrderService } from 'src/app/shared/services/operations.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [SharedAnimations]
})
export class OrdersComponent implements OnInit {

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  products: any[] = [];

  orders: Order[] = [];

  selected: Order = new Order;

  constructor(
    private dl: DataLayerService,
    private orderService: OrderService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dl.getProducts()
    .subscribe((products: any[]) => {
      this.products = products;
    });

    this.orderService.findAllOrders()
    .subscribe((orders: Order[]) => {
      this.orders = orders;
    });

    this.selected = new Order;
  }

  selectAll(e) {
    this.products = this.products.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {}
    console.log(this.allSelected);
  }

  showDetails(content, item) {
    this.selected = item;
    console.log(item)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

}
