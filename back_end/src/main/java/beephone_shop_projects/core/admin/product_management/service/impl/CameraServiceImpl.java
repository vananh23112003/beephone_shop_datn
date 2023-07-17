package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.CameraRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CameraServiceImpl implements IService<Camera> {

    @Autowired
    private CameraRepository cameraRepository;


    @Override
    public Page<Camera> getAll(Pageable pageable) {
        return cameraRepository.findAllByDelected(true,pageable);
    }

    @Override
    public void insert(Camera camera) {
        cameraRepository.save(camera);
    }

    @Override
    public void update(Camera camera, String id) {
        cameraRepository.save(camera);
    }

    @Override
    public void delete(String id) {
        cameraRepository.updateDelected(false,id);
    }

    public Camera getOne(String id){
        return cameraRepository.findById(id).get();
    }

    public ArrayList<Camera> getListCamera(){
        return (ArrayList<Camera>) this.cameraRepository.findAll();
    }
}
