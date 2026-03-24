<x-layout>
    <h1 class="title">Admin Dashboard</h1>

    <div class="flex flex-row gap-2 justify-between">
        <div class="admin-card flex-row justify-items-center">
            <h1 class="card-title">Post Count</h1>
            <div class="mini-card flex items-center justify-center">
                <h2 class="card-count">{{ $postCount }}</h2>
            </div>
        </div>
        <div class="admin-card flex-row justify-items-center">
            <h1 class="card-title">User Count</h1>
            <div class="mini-card flex items-center justify-center">
                <h2 class="card-count">{{ $userCount }}</h2>
            </div>
        </div>
        <div class="admin-card flex-row justify-items-center">
            <h1 class="card-title">Subscriber Count</h1>
            <div class="mini-card flex items-center justify-center">
                <h2 class="card-count"s>{{ $subscriberCount }}</h2>
            </div>
        </div>
    </div>

    <div>
        <div id="admin-tabs"></div>
    </div>
</x-layout>