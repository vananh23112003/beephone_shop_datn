package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.constant.Constants;
import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Constants.Api.API_ORDER_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class HoaDonRestController {

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private LichSuHoaDonServiceImpl lichSuHoaDonService;

  @GetMapping
  public ResponseEntity<?> getOrders(@ModelAttribute SearchFilterOrderDto searchFilter) {
    if (searchFilter.getKeyword() == null) {
      searchFilter.setKeyword("");
    }
    if (searchFilter.getCurrentPage() == null) {
      searchFilter.setCurrentPage(1);
    }
    if (searchFilter.getPageSize() == null) {
      searchFilter.setPageSize(5);
    }
    Page<OrderDto> orders = hoaDonService.findOrdersByMultipleCriteriaWithPagination(searchFilter);
    if (orders.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOrderDetails(@PathVariable("id") String id) {
    OrderDto order = hoaDonService.getOrderDetailsById(id);
    if (order == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(order, HttpStatus.OK);
  }

  @GetMapping("/{id}/orderHistory")
  public ResponseEntity<?> getOrderHistoriesByOrderId(@PathVariable("id") String id) {
    OrderDto order = hoaDonService.getOrderDetailsById(id);
    List<OrderHistoryDto> orderHistories = lichSuHoaDonService.getOrderHistoriesByOrderId(order.getMa());
    if (order == null) {
      return ResponseEntity.notFound().build();
    }
    if (orderHistories.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(orderHistories, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<?> placeOrder(Account account, Voucher voucher) throws Exception {
    OrderDto createdOrder = hoaDonService.placeOrder(account, voucher);
    return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateOrder(@RequestBody UpdateOrderDto updateOrderDTO, @PathVariable("id") String id) throws Exception {
    OrderDto order = hoaDonService.getOrderDetailsById(id);
    if (order == null) {
      return ResponseEntity.notFound().build();
    }
    OrderDto updatedOrder = hoaDonService.updateOrder(updateOrderDTO, order);
    return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
  }

}