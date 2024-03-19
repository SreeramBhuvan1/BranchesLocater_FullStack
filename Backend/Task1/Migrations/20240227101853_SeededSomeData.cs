using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class SeededSomeData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "City", "Country", "Currency", "Latitude", "Longitude", "Opened_dt", "Phone", "State", "Status" },
                values: new object[] { 1, "19020 111th Ave", "AB100", "Monday - Friday 7:30am - 5:00pm", "EDMONTON", "Canada", "CAD", 54.0, -114.0, new DateOnly(2008, 9, 15), "780-801-5006", "Alberta", true });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
