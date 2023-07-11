package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.service.impl.DongSanPhamServiceImpl;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dong-san-pham")
@CrossOrigin(origins = "http://localhost:3000")
public class DongSanPhamRestController {

    @Autowired
    private DongSanPhamServiceImpl dongSanPhamService;

    @GetMapping("/view-all")
    public Page<DongSanPham> viewAll(@RequestParam(value = "page",defaultValue = "1") Integer page) {
        Pageable pageable = PageRequest.of(page-1,5);
        return dongSanPhamService.getAll(pageable);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")String id) {
        dongSanPhamService.delete(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody DongSanPham anh) {
        dongSanPhamService.insert(anh);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody DongSanPham anh ,@PathVariable("id")String id) {
        dongSanPhamService.insert(anh);
    }

}
