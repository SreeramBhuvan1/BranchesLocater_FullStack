using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class SeededOneMoreData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "City", "Country", "Currency", "Latitude", "Longitude", "Opened_dt", "Phone", "State", "Status" },
                values: new object[] { 2, "26229 Twp 531 A Unit 115", "ABACH", "Monday - Friday 7:30am - 5:00pm", "ACHESON", "Canada", "CAD", 54.0, -114.0, new DateOnly(2008, 6, 26), "(780)-960-4120", "Alberta", "Open" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
