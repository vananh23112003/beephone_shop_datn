package beephone_shop_projects.core.admin.voucher_management.controller;

import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.UpdateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/voucher")
@CrossOrigin("*")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity getOneVoucher(@PathVariable("id") String id) {
        return new ResponseEntity(voucherService.getOne(id), HttpStatus.OK);
    }

    @PostMapping("/addVoucher")
    public ResponseEntity addVoucher(@RequestBody CreateVoucherRequest request) {
        return new ResponseEntity(voucherService.addVoucher(request), HttpStatus.CREATED);
    }

    @PutMapping("/updateVoucher/{id}")
    public ResponseEntity updateVoucher(@PathVariable("id") String id,@RequestBody UpdateVoucherRequest request) {
        return new ResponseEntity(voucherService.updateVoucher(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteVoucher/{id}")
    public ResponseEntity deleteVoucher(@PathVariable("id") String id) {
        return new ResponseEntity(voucherService.deleteVoucher(id), HttpStatus.OK);
    }

    @PutMapping("/deleteTrangThaiVoucher/{id}")
    public ResponseEntity deleteTrangThaiVoucher(@PathVariable("id") String id) {
        return new ResponseEntity(voucherService.doiTrangThai(id), HttpStatus.OK);
    }

    @GetMapping("/vouchers")
    public ResponseEntity hienThiVoucher(@ModelAttribute FindVoucherRequest request) {
        return new ResponseEntity(voucherService.getAll(request), HttpStatus.OK);
    }

}
