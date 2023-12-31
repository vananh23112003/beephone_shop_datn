package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cau_hinh")
public class CauHinh extends PrimaryEntity implements Serializable {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ram")
    private Ram idRam;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rom")
    private Rom idRom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_pin")
    private Pin idPin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_mau_sac")
    private MauSac idMauSac;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_man_hinh")
    private ManHinh idManHinh;

}
