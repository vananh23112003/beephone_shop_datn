package beephone_shop_projects.core.admin.product_management.controller;

import beephone_shop_projects.core.admin.product_management.model.request.CreateCauHinhRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.CauHinhResponce;
import beephone_shop_projects.core.admin.product_management.service.impl.CauHinhServiceImpl;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.Chip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cau-hinh")
@CrossOrigin(origins = "http://localhost:3000")
public class CauHinhController {

    @Autowired
    private CauHinhServiceImpl cauHinhService;

    @GetMapping("/view-all")
    public Page<CauHinhResponce> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return cauHinhService.getAllCauHinhResponce(pageable);
    }

    @PostMapping("/save")
    public void save(@RequestBody CreateCauHinhRequest req) {
        cauHinhService.addCauHinh(req);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id")String id) {
        cauHinhService.delete(id);
    }

}
