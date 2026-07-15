package com.taxsystem.dto;

import lombok.Data;

@Data
public class DashboardDTO {

    private Long totalUsers;

    private Long totalBusinesses;

    private Long activeBusinesses;

    private Long pendingBusinesses;

    private Long rejectedBusinesses;

    private Long totalMonthlyTaxes;

    private Long paidTaxes;

    private Long unpaidTaxes;

    private Long overdueTaxes;

    private Double totalRevenue;

}