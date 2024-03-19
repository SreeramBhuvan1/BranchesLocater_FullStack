using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class SeededNewData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "25d47f8c-aeb2-4063-85be-c2336020fc5b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b797686-9acb-4668-957b-d3a78be05816");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1245b133-cf5a-4a9d-9d08-8788d72c632c", null, "User", "USER" },
                    { "97e5179a-5acf-477f-8373-33181ad74f95", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityId", "CityName", "Country", "Currency", "State" },
                values: new object[] { 3, "AIRDRIE", "Canada", "CAD", "Alberta" });

            migrationBuilder.InsertData(
                table: "Branches",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "CityId", "Latitude", "Longitude", "Opened_dt", "Phone", "Status" },
                values: new object[] { 3, "118 Eastlake Blvd NE Suite 101", "ABAIR", "7:30 to 5:00 moday to friday", 3, 51.0, -114.0, new DateOnly(2008, 1, 10), "(403)948-1347", "Open" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1245b133-cf5a-4a9d-9d08-8788d72c632c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97e5179a-5acf-477f-8373-33181ad74f95");

            migrationBuilder.DeleteData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Cities",
                keyColumn: "CityId",
                keyValue: 3);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "25d47f8c-aeb2-4063-85be-c2336020fc5b", null, "Administrator", "ADMINISTRATOR" },
                    { "5b797686-9acb-4668-957b-d3a78be05816", null, "User", "USER" }
                });
        }
    }
}
