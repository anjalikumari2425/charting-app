# Kwalee-Assesment

Steps to run the project:

* npm i
* npm start

Pre-requisite

* Should have node installed (myversion - v14.18.2).


### Current Scope
* I have used the React framework for building the application.
* A chart will be shown to the user where the x-axis will show the date range and the y-axis will display the total number of daily users corresponding to the selected options from the dropdowns by the user. Eg Country - FR, Platform - ios etc. A table of filtered data is also displayed.
* The idea behind my implementation is that the user will be shown a dropdown where he can select the option for which he wants to view the total number of daily users.
* For displaying the chart I have used the recharts library of react.
* I have added a filter to select the date range to narrow down the results for a particular date range.

### Problems Faced
* Data was provided in csv format. Had to find a way to convert it to JSON format for it's advantages over csv like JSON files are easily parsed.
* Date conversion issues due to timestamp offset of GMT. Solved it by resetting hours in the date object.

### Future Scope
* I would have extended the analytics on the basis that currently only one selection option is provided to the user either on the basis of country, app,platform or network. But this could be extended to select multiple options (combination of different filters) at the same time to view the data. For eg. total no of daily users on the basis of a particular country and a particular app on a particular network. Like Country= ‘FR’, App=”Carz” , network=”Add network 1” and platform=”ios”. On selecting these options total no of daily users will be shown.
* Allow users to select the type of chat like Bar chart, Area chart , Pie chart. For example pie charts showing percentage distribution with respect to country/app/platform/network.
* Improve user experience by adding animations.
* Download chart as an image.
* Download table data of the filtered data as csv.
* Creating shareable links for analytics dashboard that could be shared with business.
