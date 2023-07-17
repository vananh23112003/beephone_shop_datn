package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.PinRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PinServiceImpl implements IService<Pin> {

    @Autowired
    private PinRepository pinRepository;


    @Override
    public Page<Pin> getAll(Pageable pageable) {
        return pinRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(Pin pin) {
        pinRepository.save(pin);
    }

    @Override
    public void update(Pin pin, String id) {
        pinRepository.save(pin);
    }

    @Override
    public void delete(String id) {
        pinRepository.updateDelected(false,id);
    }

    public Pin getOne(String id){
        return pinRepository.findById(id).get();
    }

    public ArrayList<Pin> getDanhSachPin(){
        return (ArrayList<Pin>) this.pinRepository.findAll();
    }
}
