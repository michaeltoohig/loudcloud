class Api::TracksController < ApplicationController
  before_action :require_login!, only: [:create, :destroy, :like, :unlike]

  def index
    if (params[:artist_id])
      @tracks = Track.where(artist_id: params[:artist_id])
                     .order(created_at: :desc)
                     .includes(:plays, :likes, :comments, :artist)
    elsif params[:top_ten]
      @tracks = Track.top_ten
    else
      @tracks = Track.order(created_at: :desc)
                     .limit(10)
                     .includes(:plays, :likes, :comments, :artist)
    end
  end

  def update
    @track = Track.includes(:plays, comments: [:author]).find_by(id: params[:id])

    if @track.update(track_params)
      render :show
    else
      render json: @track.errors, status: 422
    end
  end

  def show
    @track = Track.includes(:likes, :artist, :plays, comments: [:author]).find_by(id: params[:id])
  end

  def create
    @track = current_user.tracks.new(track_params);

    if @track.save
      render :show
    else
      render json: @track.errors, status: 422
    end
  end

  def destroy
    @track = Track.find_by(id: params[:id])

    if @track
      @track.destroy
    end

    render json: {}, status: 200
  end

  def like
    @track = Track.includes(:likes).find_by(id: params[:id])
    @track.likes.create(user_id: current_user_id)

    render json: {}, status: 200
  end

  def unlike
    @track = Track.includes(:likes).find_by(id: params[:id])
    @track.likes.find_by(user_id: current_user_id).destroy

    render json: {}, status: 200
  end

  def play
    @track = Track.includes(:plays).find_by(id: params[:id])
    @track.plays.create(user_id: current_user_id)

    render json: {}, status: 200
  end

  private
  def track_params
    params.require(:track).permit(:title, :audio, :credits, :image)
  end
end
